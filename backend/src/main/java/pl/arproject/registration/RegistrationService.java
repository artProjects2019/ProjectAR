package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserRepository;
import pl.arproject.appuser.AppUserRole;
import pl.arproject.email.RegistrationEmailService;
import pl.arproject.exception.RegistrationConfirmationException;
import pl.arproject.exception.RegistrationRequestException;
import pl.arproject.registration.token.ConfirmationToken;
import pl.arproject.registration.token.ConfirmationTokenService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Service
public class RegistrationService {

    private final AppUserRepository appUserRepository;
    private final RegistrationValidator registrationValidator;
    private final RegistrationEmailService registrationEmailService;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseEntity<?> registerUser(RegistrationRequest request) {
        String errorMessage = registrationValidator.validateRegistrationRequest(request);

        // if registration data are invalid
        if(!errorMessage.isEmpty()) {
            throw new RegistrationRequestException(errorMessage);
        }

        AppUser appUser = new AppUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                AppUserRole.USER);

        Optional<AppUser> userFromDb = appUserRepository
                .findByEmailOrUsername(appUser.getEmail(), appUser.getUsername());

        // if email or username is already taken
        if(userFromDb.isPresent()) {
            // if exactly the same user exist and his account is not confirmed then send refreshed token
            if(sameUserExistAndHisTokenIsNotConfirmed(userFromDb.get(), appUser)) {
                refreshOldTokenAndSendNewConfirmationEmail(userFromDb.get());

                return ResponseEntity
                        .status(OK)
                        .body("refreshed token has been sent to your email");
            }
            else  { // otherwise it means that this is not the same user so return an error message
                throw new RegistrationRequestException("email or username are already taken");
            }
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        registrationEmailService.sendEmail(appUser.getEmail(), appUser.getUsername(), token);

        return ResponseEntity
                .status(CREATED)
                .body("verification token has been sent to your email");
    }

    @Transactional
    public ResponseEntity<?> confirmToken(String token) {
        Optional<ConfirmationToken> tokenFromDb = confirmationTokenService.findByToken(token);

        // if token does not exist
        if(!tokenFromDb.isPresent()) {
            throw new RegistrationConfirmationException("token not found", NOT_FOUND);
        }

        ConfirmationToken confirmationToken = tokenFromDb.get();

        // if token is already confirmed
        if(confirmationToken.getConfirmedAt() != null) {
            throw new RegistrationConfirmationException("email already confirmed", GONE);
        }

        LocalDateTime expiresAt = confirmationToken.getExpiresAt();

        // if token already expired
        if(expiresAt.isBefore(LocalDateTime.now())) {
            throw new RegistrationConfirmationException("token already expired", GONE);
        }

        confirmationTokenService.updateConfirmedAt(token);
        appUserRepository.enableUser(confirmationToken.getAppUser().getEmail());

        return ResponseEntity
                .status(OK)
                .body("verification completed");
    }

    private boolean sameUserExistAndHisTokenIsNotConfirmed(AppUser userFromDb, AppUser newUser) {
        ConfirmationToken oldToken = confirmationTokenService.findByUserId(userFromDb.getId());

        boolean oldTokenIsNotConfirmed = oldToken.getConfirmedAt() == null;
        boolean passwordsMatches = bCryptPasswordEncoder.matches(newUser.getPassword(), userFromDb.getPassword());
        boolean usersAreIdentical = userFromDb.equalsExceptIdAndPassword(newUser) && passwordsMatches;

        return usersAreIdentical && oldTokenIsNotConfirmed;
    }

    private void refreshOldTokenAndSendNewConfirmationEmail(AppUser appUser) {
        String token = UUID.randomUUID().toString();

        confirmationTokenService.refreshToken(
                appUser.getId(),
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15)
        );

        registrationEmailService.sendEmail(appUser.getEmail(), appUser.getUsername(), token);
    }
}

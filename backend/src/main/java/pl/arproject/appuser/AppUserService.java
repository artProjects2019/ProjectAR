package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.registration.token.ConfirmationToken;
import pl.arproject.registration.token.ConfirmationTokenService;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(appUserRepository.findAll());
    }

    public ResponseEntity<?> getUserByUsername(String username) {
        Optional<AppUser> userFromDb = appUserRepository.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user " + username + " not found");
        }

        return ResponseEntity.ok(userFromDb);
    }

    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    public boolean sameUserExistAndTokenIsNotConfirmed(AppUser userFromDb, AppUser newUser) {
        boolean passwordsMatchesAndTokenIsNotConfirmed =
                passwordsMatchesAndTokenIsNotConfirmed(userFromDb, newUser.getPassword());
        boolean usersAreIdentical = userFromDb.equalsExceptIdAndPassword(newUser);

        return usersAreIdentical && passwordsMatchesAndTokenIsNotConfirmed;
    }

    public boolean passwordsMatchesAndTokenIsNotConfirmed(AppUser userFromDb, String passwordRequest) {
        ConfirmationToken token = confirmationTokenService.findByUserId(userFromDb.getId());

        boolean tokenIsNotConfirmed = token.getConfirmedAt() == null;
        boolean passwordsMatches = passwordEncoder.matches(passwordRequest, userFromDb.getPassword());

        return passwordsMatches && tokenIsNotConfirmed;
    }
}

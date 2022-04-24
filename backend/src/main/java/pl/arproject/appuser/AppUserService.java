package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.exception.UserNotFoundException;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(appUserRepository.findAll());
    }

    public ResponseEntity<?> findUserByUsername(String username) {
        Optional<AppUser> userFromDb = appUserRepository.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user " + username + " not found");
        }

        return ResponseEntity.ok(userFromDb);
    }
}

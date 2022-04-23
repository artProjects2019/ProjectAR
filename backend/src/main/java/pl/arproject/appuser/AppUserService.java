package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user with username: " + username + " not found"));
    }

    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(appUserRepository.findAll());
    }

    public ResponseEntity<?> findUserByUsername(String username) {
        Optional<AppUser> userFromDb = appUserRepository.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UsernameNotFoundException("user " + username + " not found");
        }

        return ResponseEntity.ok(userFromDb);
    }
}

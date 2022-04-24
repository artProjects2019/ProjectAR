package pl.arproject.authentication;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> userFromDb = appUserRepository.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UsernameNotFoundException("user with username: " + username + " not found");
        }

        AppUser user = userFromDb.get();

        return new UserDetailsImpl(
                user.getUsername(),
                user.getPassword(),
                user.getRole().getGrantedAuthorities(),
                user.isLocked(),
                user.isEnabled()
        );
    }
}

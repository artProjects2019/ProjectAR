package pl.arproject.appuser;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<?> findAllUsers() {
        return appUserService.findAllUsers();
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable("username") String username) {
        return appUserService.findUserByUsername(username);
    }
}

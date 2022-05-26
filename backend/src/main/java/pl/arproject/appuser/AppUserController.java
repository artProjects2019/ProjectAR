package pl.arproject.appuser;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.arproject.appuser.request.ChangePasswordRequest;

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
    public ResponseEntity<?> getUserByUsername(@PathVariable("username") String username) {
        return appUserService.getUserByUsername(username);
    }

    @PatchMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        return appUserService.changePassword(request);
    }
}


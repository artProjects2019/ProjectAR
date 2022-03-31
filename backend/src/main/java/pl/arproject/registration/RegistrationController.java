package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> signUpUser(@RequestBody RegistrationRequest request) {
        return registrationService.signUpUser(request);
    }

    @GetMapping(path = "confirm")
    public ResponseEntity<?> confirmToken(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}

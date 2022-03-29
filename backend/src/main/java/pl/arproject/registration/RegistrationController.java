package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> signUpUser(@RequestBody RegistrationRequest request) {
        return registrationService.signUpUser(request);
    }

    @PatchMapping(path = "confirm")
    public ResponseEntity<?> confirmToken(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}

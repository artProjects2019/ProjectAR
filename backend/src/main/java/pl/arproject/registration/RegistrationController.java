package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        return registrationService.registerUser(request);
    }

    @GetMapping(path = "/confirm")
    public ResponseEntity<?> confirmToken(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}

package pl.arproject.game.invitation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games/invitations")
@AllArgsConstructor
public class GameInvitationController {

    private final GameInvitationService gameInvitationService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getInvitationsByUsername(
            @PathVariable("username") String username) {

        return gameInvitationService.getInvitationsByUsername(username);
    }
}

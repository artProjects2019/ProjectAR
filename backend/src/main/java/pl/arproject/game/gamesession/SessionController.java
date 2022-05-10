package pl.arproject.game.gamesession;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.arproject.game.gamesession.request.*;
import pl.arproject.game.invitation.request.GameInvitationAcceptRequest;
import pl.arproject.game.invitation.request.GameInvitationDeclineRequest;

@RestController
@RequestMapping("/api/games/sessions")
@AllArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewSession(@RequestBody SessionCreateRequest request) {
        return sessionService.createNewSession(request);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptInvitation(@RequestBody GameInvitationAcceptRequest request) {
        return sessionService.acceptInvitation(request);
    }

    @PostMapping("/decline/{sessionKey}")
    public ResponseEntity<?> declineInvitation(@PathVariable(name = "sessionKey") String sessionKey) {
        return sessionService.declineInvitation(sessionKey);
    }

    @DeleteMapping("/close")
    public ResponseEntity<?> closeSession(@RequestBody SessionCloseRequest request) {
        return sessionService.closeSession(request);
    }
}

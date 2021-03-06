package pl.arproject.game.gamesession;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import pl.arproject.game.gamesession.request.*;
import pl.arproject.game.invitation.request.GameInvitationAcceptRequest;

@RestController
@RequestMapping("/api/games/sessions")
@AllArgsConstructor
public class SessionController {

    private final SessionService sessionService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/{sessionKey}")
    public ResponseEntity<?> findSessionBySessionKey(@PathVariable(name = "sessionKey") String sessionKey) {
        return sessionService.findSessionBySessionKey(sessionKey);
    }

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

    @DeleteMapping("/close/{sessionKey}")
    public ResponseEntity<?> closeSession(@PathVariable(name = "sessionKey") String sessionKey) {
        return sessionService.closeSession(sessionKey);
    }

    @PostMapping("/lobby")
    public ResponseEntity<?> lobby(@RequestBody SessionSocketRequest request) {
        String message = request.getMessage();
        simpMessagingTemplate.convertAndSend("/topic/lobby/" + request.getSessionKey(), message);

        return ResponseEntity.ok(message);
    }
}

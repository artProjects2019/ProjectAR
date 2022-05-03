package pl.arproject.game.gamesession;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.arproject.game.gamesession.request.*;

@RestController
@RequestMapping("/api/games/sessions")
@AllArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewSession(@RequestBody SessionCreateRequest request) {
        return sessionService.createNewSession(request);
    }

    @PatchMapping("/join")
    public ResponseEntity<?> joinSession(@RequestBody SessionJoinRequest request) {
        return sessionService.joinSession(request);
    }

    @PatchMapping("/invite")
    public ResponseEntity<?> inviteToSession(@RequestBody SessionInviteRequest request) {
        return sessionService.inviteToSession(request);
    }

    @DeleteMapping("/close")
    public ResponseEntity<?> closeSession(@RequestBody SessionCloseRequest request) {
        return sessionService.closeSession(request);
    }
}

package pl.arproject.game;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games")
@AllArgsConstructor
public class GameController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/gameMove")
    public ResponseEntity<?> gamePlay(@RequestBody GameMoveRequest request) {
        simpMessagingTemplate.convertAndSend("/topic/game/" + request.getSessionKey(), request);

        return ResponseEntity.ok(request);
    }

    @PostMapping("/memory/cards")
    public ResponseEntity<?> locateCards(@RequestBody MemoryCardsRequest request) {
        simpMessagingTemplate.convertAndSend("/topic/game/" + request.getSessionKey(), request);

        return ResponseEntity.ok(request);
    }
}

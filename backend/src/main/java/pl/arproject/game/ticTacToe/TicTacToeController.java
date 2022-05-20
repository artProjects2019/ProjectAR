package pl.arproject.game.ticTacToe;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games/sessions")
@AllArgsConstructor
public class TicTacToeController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/ticTacToeMove")
    public ResponseEntity<?> gamePlay(@RequestBody TicTacToeMoveRequest request) {
        simpMessagingTemplate.convertAndSend("/topic/game/" + request.getSessionKey(), request);

        return ResponseEntity.ok(request);
    }
}

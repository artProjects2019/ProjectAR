package pl.arproject.game.tictactoe;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games/tictactoe")
public class TicTacToeController {

    @PostMapping("/move")
    @MessageMapping("/gameplay")
    @SendTo("/topic/messages")
    public ResponseEntity<?> makeAMove(@RequestBody TicTacToeMoveRequest request) {
        TicTacToeMoveResponse response = new TicTacToeMoveResponse(
                request.getBoxNumber(), request.getMark()
        );

        return ResponseEntity.ok(response);
    }
}

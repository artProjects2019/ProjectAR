package pl.arproject.game.ticTacToe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TicTacToeMoveRequest {
    private Integer boxNumber;
    private String mark;
    private String sessionKey;
}

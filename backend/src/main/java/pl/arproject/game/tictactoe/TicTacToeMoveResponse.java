package pl.arproject.game.tictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TicTacToeMoveResponse {
    private int boxNumber;
    private int mark;
}

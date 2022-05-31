package pl.arproject.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GameMoveRequest {
    private Integer boxNumber;
    private String player;
    private String sessionKey;
}

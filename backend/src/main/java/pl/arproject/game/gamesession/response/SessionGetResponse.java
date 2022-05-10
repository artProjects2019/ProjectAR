package pl.arproject.game.gamesession.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SessionGetResponse {
    private String firstPlayerUsername;
    private String secondPlayerUsername;
}

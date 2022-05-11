package pl.arproject.game.gamesession.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SessionGetResponse {
    private String firstPlayerUsername;
    private String secondPlayerUsername;
}

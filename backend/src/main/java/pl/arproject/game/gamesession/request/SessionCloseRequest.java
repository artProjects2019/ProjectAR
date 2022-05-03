package pl.arproject.game.gamesession.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SessionCloseRequest {
    private String sessionKey;
}

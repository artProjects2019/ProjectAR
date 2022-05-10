package pl.arproject.game.gamesession.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class SessionCreateResponse {
    String sessionKey;
    String message;
}

package pl.arproject.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class MemoryCardsRequest {
    private List<String> cards;
    private String sessionKey;
    private String action;
}

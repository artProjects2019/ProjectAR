package pl.arproject.ranking.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class RankingGetResponse {
    private String username;
    private Integer score;
}

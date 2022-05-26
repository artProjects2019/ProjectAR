package pl.arproject.ranking;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    private final RankingService rankingService;

    @PatchMapping("/{username}")
    public ResponseEntity<?> updateUserScore(@PathVariable("username") String username) {
        return rankingService.updateUserScore(username);
    }

    @GetMapping
    public ResponseEntity<?> findAllRankings() {
        return rankingService.findAllRankings();
    }
}

package pl.arproject.ranking;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.exception.RankingNotFoundException;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.mapper.Mapper;
import pl.arproject.ranking.response.RankingGetResponse;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@Service
@AllArgsConstructor
public class RankingService {

    private final RankingRepository rankingRepository;
    private final AppUserService appUserService;
    private final Mapper mapper;

    public void saveRanking(Ranking ranking) {
        rankingRepository.save(ranking);
    }

    public ResponseEntity<?> updateUserScore(String username) {
        Optional<AppUser> userFromDb = appUserService.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        Optional<Ranking> rankingFromDb = rankingRepository.findByAppUser_Username(username);

        if(!rankingFromDb.isPresent()) {
            throw new RankingNotFoundException("ranking not found");
        }

        Ranking ranking = rankingFromDb.get();
        ranking.updateScore();

        rankingRepository.save(ranking);

        return ResponseEntity
                .status(OK)
                .body("ranking has been updated");
    }

    public ResponseEntity<?> findAllRankings() {
        List<Ranking> rankingsFromDb = rankingRepository.findByOrderByScoreDesc();
        List<RankingGetResponse> responses = mapper.mapRankings(rankingsFromDb);

        return ResponseEntity.ok(responses);
    }
}

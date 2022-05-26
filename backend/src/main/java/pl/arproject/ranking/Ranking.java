package pl.arproject.ranking;

import lombok.*;
import pl.arproject.appuser.AppUser;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Table(name = "rankings")
@Entity(name = "Ranking")
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    @Column(name = "score")
    private Integer score;

    public Ranking(AppUser appUser, Integer score) {
        this.appUser = appUser;
        this.score = score;
    }

    public void updateScore() {
        this.score += 5;
    }
}

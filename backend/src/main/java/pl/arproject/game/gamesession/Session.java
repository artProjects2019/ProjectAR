package pl.arproject.game.gamesession;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.arproject.appuser.AppUser;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "game_sessions")
@Entity(name = "Session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_key")
    private String sessionKey;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "first_first_id", referencedColumnName = "id")
    private AppUser firstPlayer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "second_player_id", referencedColumnName = "id")
    private AppUser secondPlayer = null;

    @Column(name = "expected_player")
    private String expectedPlayerUsername = null;

    public Session(String sessionKey, AppUser firstPlayer) {
        this.sessionKey = sessionKey;
        this.firstPlayer = firstPlayer;
    }
}

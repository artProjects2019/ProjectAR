package pl.arproject.game.invitation;

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
@Table(name = "game_invitations")
@Entity(name = "GameInvitation")
public class GameInvitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private AppUser sender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    private AppUser receiver;

    @Column(name = "game")
    private String game;

    @Column(name = "session_key")
    private String sessionKey;

    public GameInvitation(AppUser sender, AppUser receiver, String game, String sessionKey) {
        this.sender = sender;
        this.receiver = receiver;
        this.game = game;
        this.sessionKey = sessionKey;
    }
}

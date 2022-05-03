package pl.arproject.friend.invitation;

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
@Table(name = "friend_invitations")
@Entity(name = "FriendInvitation")
public class FriendInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private AppUser sender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    private AppUser receiver;

    public FriendInvitation(AppUser sender, AppUser receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }
}

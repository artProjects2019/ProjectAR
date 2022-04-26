package pl.arproject.friend.invitation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.arproject.appuser.AppUser;

import java.util.List;

@Repository
public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, Long> {

    boolean existsBySenderAndReceiver(AppUser sender, AppUser receiver);

    @Query("SELECT fi " +
            "FROM FriendInvitation fi " +
            "WHERE fi.receiver.username = ?1 ")
    List<FriendInvitation> findAllByReceiverUsername(String username);
}

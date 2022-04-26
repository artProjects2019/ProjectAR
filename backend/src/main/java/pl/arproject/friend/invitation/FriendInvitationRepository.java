package pl.arproject.friend.invitation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.arproject.appuser.AppUser;

import java.util.List;

@Repository
public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, Long> {
    boolean existsBySenderAndReceiver(AppUser sender, AppUser receiver);

    @Modifying
    @Query("DELETE FROM " +
            "FriendInvitation fi " +
            "WHERE fi.sender.id = ?1 " +
            "AND fi.receiver.id = ?2 ")
    void deleteBySenderAndReceiver(Long senderId, Long receiverId);

    List<FriendInvitation> findAllByReceiverUsername(String username);
}

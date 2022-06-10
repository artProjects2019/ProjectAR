package pl.arproject.friend.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FriendDeleteRequest {
    private String firstUser;
    private String secondUser;
}

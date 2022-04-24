package pl.arproject.appuser;

import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static pl.arproject.appuser.AppUserPermission.WEBSITE_READ;
import static pl.arproject.appuser.AppUserPermission.WEBSITE_WRITE;

@Getter
@AllArgsConstructor
public enum AppUserRole {
    USER(Sets.newHashSet(WEBSITE_READ, WEBSITE_WRITE)),
    ADMIN(Sets.newHashSet(WEBSITE_READ, WEBSITE_WRITE));

    private final Set<AppUserPermission> permissions;

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());

        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

        return permissions;
    }
}

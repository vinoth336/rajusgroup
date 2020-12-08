<div class="sidebar" data-color="orange" data-background-color="white" data-image="{{ asset('material') }}/img/sidebar-1.jpg">
  <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
  <div class="logo">
    <a href="https://creative-tim.com/" class="simple-text logo-normal">
      {{ __('Rajus Group') }}
    </a>
  </div>
  <div class="sidebar-wrapper">
    <ul class="nav">
      <li class="nav-item{{ $activePage == 'dashboard' ? ' active' : '' }}">
        <a class="nav-link" href="{{ route('home') }}">
          <i class="material-icons">dashboard</i>
            <p>{{ __('Dashboard') }}</p>
        </a>
      </li>
      <li class="nav-item{{ $activePage == 'member' ? ' active' : '' }}">
        <a class="nav-link" data-toggle="collapse" href="#laravelExample" aria-expanded="true" href="#">
          <i class="material-icons">content_paste</i>
            <p>{{ __('Member') }}</p>
        </a>
        <div class="collapse show" id="laravelExample">
            <ul class="nav">
                <li class="nav-item{{ $activePage == 'profile' ? ' active' : '' }}">
                    <a class="nav-link" href="{{ route('admin.member.index') }}">
                        <span class="sidebar-mini"> UP </span>
                        <span class="sidebar-normal">{{ __('View Members List') }} </span>
                    </a>
                </li>
              <li class="nav-item{{ $activePage == 'profile' ? ' active' : '' }}">
                <a class="nav-link" href="{{ route('admin.member.add') }}">
                  <span class="sidebar-mini"> UP </span>
                  <span class="sidebar-normal">{{ __('Add Profile') }} </span>
                </a>
              </li>
              <li class="nav-item{{ $activePage == 'user-management' ? ' active' : '' }}">
                <a class="nav-link" href="{{ route('user.index') }}">
                  <span class="sidebar-mini"> UM </span>
                  <span class="sidebar-normal"> {{ __('Add User') }} </span>
                </a>
              </li>
            </ul>
          </div>
      </li>

    </ul>
  </div>
</div>

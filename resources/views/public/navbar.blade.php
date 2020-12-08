<nav class="primary-menu sub-title">
    <ul class="menu-container">


        @if(auth()->guard('member')->check())
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>Home</div>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>My Profile</div>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>My ShortList</div>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>Response Received</div>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>Interest Request</div>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="{{ route('public.index') }}">
                    <div>Interested</div>
                </a>
            </li>
            <li class="menu-item sub-menu">
                <a class="menu-link">
                    <div>Portal</div>
                </a>
                <form id="logout-form" action="{{ route('public.logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
                <ul class="sub-menu-container">
                    <li class="menu-item">
                        <a class="menu-link" href="admin/home">Dashboard</a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href=""
                            onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
                    </li>
                </ul>
            </li>
        @else
            <li class="menu-item">
            <a class="menu-link" href="{{ route('public.index') }}">
                    <div>Home</div>
                </a>
            </li>

            <li class="menu-item mega-menu">
                <a class="menu-link" href="#">
                    <div>Our Success Stories</div>
                </a>
            </li>
            <li class="menu-item mega-menu">
                <a class="menu-link" href="{{-- route('site_faqs') --}}">
                    <div>Faqs</div>
                </a>
            </li>
            <li class="menu-item mega-menu">
                <a class="menu-link" href="/#contact_us">
                    <div>Contact Us</div>
                </a>
            </li>
            <li class="menu-item mega-menu">
                <a class="menu-link" href="{{ route('public.login') }}">
                        <div>Login</div>
                    </a>
                </li>
        @endif
    </ul>
</nav>

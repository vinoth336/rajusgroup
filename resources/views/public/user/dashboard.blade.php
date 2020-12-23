@extends('public.app')
@section('content')

    <section id="content">
        <div class="content-wrap">
            <div class="container-fluid px-2 clearfix">
                <div class="row clearfix">
                    @include('public.user.quick_filter')
                    <div class="col-md-6 profile_container scrollit" style="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <br>
                                    <h3 class="px-3">Based on your profile details, following are matched profiles</h3>
                                </div>
                                <div class="row">
                                    @foreach($profiles as $profile)
                                        @include('public.user.components.member_profile_summary')
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    @include('public.user.sidebar')
                </div>
            </div>
        </div>
    </section>
<script>

    $(document).ready(function() {
        MemberDashboard.init();
    });

    var MemberDashboard = {
        eventSendInterest : function() {
            memberDashboard = this;
            $(".profile_container").on('click', '.send_interest', function() {
                    memberDashboard.sendInterest(this);
            });

            $(".profile_container").on('click', '.add_profile_to_shortlist', function() {
                    memberDashboard.ShortListProfile(this);
            });

            $(".profile_container").on('click', '.add_profile_to_ignore_list', function() {
                    memberDashboard.IgnoredTheProfile(this);
            });

        },

        sendInterest : function(profile) {
            var profileContainer = $(profile).closest('.member_profile');
            $.ajax({
                url : "/sendinterest/" + profileContainer.find('[name="member_code"]').val(),
                type : "post",
                dataType : "json",
                success : function(data) {
                        alert('success');
                        profileContainer.fadeOut().remove();
                },
                error : function() {

                }
            });

        },
        ShortListProfile : function(profile) {
            var profileContainer = $(profile).closest('.member_profile');
            $.ajax({
                url : "/addshortlist/" + profileContainer.find('[name="member_code"]').val(),
                type : "post",
                dataType : "json",
                success : function(data) {
                        alert('success');
                        profileContainer.fadeOut().remove();
                },
                error : function() {

                }
            });

        },
        IgnoredTheProfile : function(profile) {
            var profileContainer = $(profile).closest('.member_profile');
            $.ajax({
                url : "/addignore/" + profileContainer.find('[name="member_code"]').val(),
                type : "post",
                dataType : "json",
                success : function(data) {
                        alert('success');
                        profileContainer.fadeOut().remove();
                },
                error : function() {

                }
            });
        },
        init : function() {
            this.eventSendInterest();
        }
    };

</script>

@endsection

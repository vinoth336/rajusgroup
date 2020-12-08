@extends('layouts.app', ['activePage' => 'member', 'titlePage' => __('Members')])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header card-header-primary">
                            <h4 class="card-title">{{ __('Members') }}</h4>
                        </div>
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-md-12 text-right" style="margin-bottom: 10px">
                                    <a href="{{ route('admin.member.add') }}" class="btn btn-primary text-right">
                                        Add Member
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="datatable" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                            <th>S NO</th>
                                            <th>Name</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        @php $sno=1 @endphp
                                        <tbody>
                                            @forelse($members as $member)
                                            <tr>
                                                <td>{{ $sno++ }}</td>
                                                <td>{{ $member->name }}</td>
                                                <td>{{ $member->created_at }}</td>
                                                <td class="text-right">
                                                    <a class="btn btn-sm btn-info" href="{{ route('admin.member.edit', $member->id) }}">
                                                        <i class="material-icons">edit</i>
                                                    </a>
                                                    <form method="POST" action="{{ route('admin.member.delete', $member->id) }}" >
                                                        @csrf
                                                        @method('delete')
                                                        <button type="button" class="btn btn-sm btn-danger text-white delete-member" data-member-name="{{ $member->name }}" data-href="{{ route('admin.member.delete', $member->id) }}">
                                                            <i class="material-icons">delete</i>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                            @empty
                                            <tr>
                                                <td colspan="4" class="text-center">
                                                    No Records Found
                                                </td>
                                            </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(".delete-member").on('click', function() {
            var memberName = $(this).data('member-name');
            if(!confirm('Are You Sure Want To Delete Member - ' + memberName + " ?")) {
                return false;
            }

            $(this).closest('form').submit();
        });

        $(document).ready(function() {
            $("#datatable").dataTable();
        });
    </script>
@endsection

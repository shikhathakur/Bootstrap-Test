$(document).ready(function() {
    //======================ajax call for pics and tab data======================
    var oCall = $.ajax({
        url: 'pics.json',
        type: 'GET',
        dataType: 'JSON'

    });

    oCall.success(function(data) {
        var pics = data;
        for (var i = 0; i < pics.Images.length; i++) {
            $('#coro img').eq(i).attr("src", pics.Images[i]);
        }
        for (var i = 0; i < pics.Item.length; i++) {
            $('#tabDiv1 p').eq(i).html(pics.Item[i].description);
            $('.title1').eq(i).html(pics.Item[i].title);
            $('#tabDiv1 img').eq(i).attr('src', pics.Item[i].logo);
        }
    });
    //=====================Table data=========================================
    $("#saveBtn").click(function() {

        $("#tableData tbody").append('<tr><td >' + $("#sno").val() + '</td><td>' +
            $("#name").val() + '</td><td>' + $("#address").val() + '</td><td>' +
            $("#empId").val() +
            '</td><td><button type="button"id="editRow">Edit</button></td><td><button type="button" id="delRow">Delete</button></td><td><button type="button" id="viewRow">View</button></td><td><span class="glyphicon glyphicon-info-sign" aria-hidden="true" data-toggle="tooltip" id="infoTooltip"></span></td></tr>');
    });
    //===============Hide Update button on click of create employee button=======
    $('#createBtn').click(function() {
        $("#updateBtn").hide();
        $('#saveBtn').show();
    })
    //==============Deleting Row================================================
    $(document).on("click", "#delRow", function() {
        $(this).closest('td').parent().remove();
    });
    //==============View data=================================================
    $('#viewDetails1').click(function() {
        $('#contentID').html($('.details').eq(0).find('p').text());
        $('#myDetails').modal('show');

    });
    $('#viewDetails2').click(function() {
        $('#contentID').html($('.details').eq(1).find('p').text());
        $('#myDetails').modal('show');

    });
    $('#viewDetails3').click(function() {
        $('#contentID').html($('.details').eq(2).find('p').text());
        $('#myDetails').modal('show');

    });
    $('#viewDetails4').click(function() {
        $('#contentID').html($('.details').eq(3).find('p').text());
        $('#myDetails').modal('show');

    });

    //=================Edit data========================================
    var cell1, cell2, cell3, cell4;
    $(document).on("click", "#editRow", function() {
        $('#myForm').modal('show');
        $('#saveBtn').hide();
        $('#updateBtn').show();
        var tr = $(this).closest('td').parent();
        cell1 = tr.find('td').eq(0);
        cell2 = tr.find('td').eq(1);
        cell3 = tr.find('td').eq(2);
        cell4 = tr.find('td').eq(3);
        $('#sno').val(cell1.text());
        $('#name').val(cell2.text());
        $('#address').val(cell3.text());
        $('#empId').val(cell4.text());
    });
    $('#updateBtn').click(function() {
        cell1.text($('#sno').val());
        cell2.text($('#name').val());
        cell3.text($('#address').val());
        cell4.text($('#empId').val());
        $('#myForm').modal('hide');
    });

    //================View data======================================
    $(document).on("click", "#viewRow", function() {
        $('#myDetails').modal('show');
        var tr = $(this).closest('td').parent();
        $('#contentID').html('S.no:' + tr.find('td').eq(0).text() + '</br>' + 'Name:' + tr.find('td').eq(1).text() + '</br>' + 'Address:' + tr.find('td').eq(2).text() + '</br>' + 'Address:' + tr.find('td').eq(3).text());
    });
    //================Tooltip data=================================
    $(document).on("mouseover", "#infoTooltip", function() {
        var tr = $(this).closest('td').parent();
        $(this).tooltip({
            title: tr.find('td').eq(1).text()
        });
    });

    //==================Table sorting================================
    var f_sl = 1;
    $('#snBtn').click(function() {
        $('#snBtn span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        f_sl *= -1;
        var n = $(this).prevAll().length;
        sortTable(f_sl, n);
    });

    function sortTable(f, n) {
        var rows = $('#tableData tbody  tr').get();

        rows.sort(function(a, b) {

            var A = Number($(a).children('td').eq(n).text());

            var B = Number($(b).children('td').eq(n).text());

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        $.each(rows, function(index, row) {
            $('#tableData').children('tbody').append(row);
        });
    }

});

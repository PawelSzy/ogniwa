/**
 * Created by pawel on 20.10.17.
 */
$("#calculate_nors").click(function(e) {
    e.preventDefault();
    var nors = $("#nors_input")
        .val()
        .split(",")
        .map(function(elem){
            return parseInt(elem);
        });
    console.log(nors);

    var sum = parseInt($("#sum_input").val());
    var nors_table = calculate_nors(sum, nors);
    show_calculatated_nors(sum, nors_table);
});

function show_calculatated_nors(sum, nors_table) {

    console.log(nors_table);

    $("#table_of_ogniwa").empty();
    nors_table.forEach(function (calc_nors, index) {
        var nors_string = calc_nors.join();
        var closure_index = index;
        $("#table_of_ogniwa").append(function() {
            return $("<tr class='nors_row'  id='nors_row_'" + index + ">"
            + "<td>"
            + calc_nors.join(" + ")
            + " = " + sum
            + "</td></tr>"
            ).click(function() {
                console.log('index', index);
                show_calculatated_nors(sum, nors_table.filter(function(elem, nor_index) {
                    return nor_index != index;
                }))
            })
        })
    });

    //$('.nors_row').unbind();
    //$('.nors_row').click(function () {
    //    $index$(this).attr('id');
    //});
}
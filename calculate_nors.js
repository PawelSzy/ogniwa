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

    var sum = parseInt($("#sum_input").val());
    var calculated_nors_table = calculate_nors(sum, nors);
    show_calculatated_nors(sum, nors, calculated_nors_table);
});

function show_calculatated_nors(sum, nors, calculated_nors_table) {
    $("#table_of_ogniwa").empty();

    calculated_nors_table.forEach(function (calc_nors, index) {
        var nors_string = calc_nors.join();
        var closure_index = index;
        $("#table_of_ogniwa").append(function() {
            return $("<tr class='nors_row'  id='nors_row_'" + index + ">"
            + "<td>"
            + calc_nors.join(" + ")
            + " = " + sum
            + "</td></tr>"
            ).click(function() {
                var closure_index = index;
                $('#table_of_chosen_ogniwa').append($(this)).unbind();

                calc_nors.forEach(function(nors_value){
                    nors = delete_value_from_nors(nors, nors_value)
                });

                show_calculatated_nors(sum, nors, calculate_nors(sum, nors));
            })
        })
    });
}


function delete_value_from_nors(nors, value) {
    find_and_delete_from_array(value, nors);
    return nors;
}

function find_and_delete_from_array(value, arr) {
    index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
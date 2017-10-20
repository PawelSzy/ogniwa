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
    console.log(nors_table);

    $("#table_of_ogniwa").empty();
    nors_table.forEach(function(calc_nors) {
        var nors_string = calc_nors.join();

        $("#table_of_ogniwa").append("<tr><td>"
        + calc_nors.join(" + ")
        + " = " + sum
        + "</td></tr>");
    })
});

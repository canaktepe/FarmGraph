farmDbModel = function () {
    var self = this;
    self.serviceUrl = "/Content/FarmGraph.aspx";
    self.options = {
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset=utf-8'
    };

    self.post = function (u, data, callback) {
        var url = self.serviceUrl + u;
        var options = $fg.extend(true, self.options, {
            url: url,
            data: data,
            success: function (response) {
                if (response) callback(response);
            },
            error: function (error) {
                callback(error);
            }
        });

        $fg.ajax(options);
    }

    self.getFarm = function (callback) {
        self.post("/GetFarm", {}, function (response) {
            if (response.d) {
                var data = response.d;
                callback({ width: data.Width, height: data.Length });
            }
        })
    }

    self.updatefarmSize = function (size, callback) {
        var data = JSON.stringify({ farm: { Length: size.Length, Width: size.Width } })
        self.post("/UpdateFarmSize", data, function (response) {
            if (response.d) {
                var data = response.d;
                callback(data);
            }
        })
    }

    self.getFarmItems = function (default_data, callback) {
        var template = default_data.devices.concat(default_data.objects).concat(default_data.physicals);
        var data = JSON.stringify({ template });
        self.post("/GetFarmItems", data, function (response) {

            if (response.d) {
                var data = response.d;
                callback(data);
            }
        })
    }
}
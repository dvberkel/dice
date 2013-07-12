(function($, _, Backbone, GURPS){
    var MainView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var $body = $('body');
            new DescriptionView({ model : this.model, el : $body });
            new ResultView({ model : this.model, el : $body });
            new SummaryView({ el : $body });
        }
    });

    var DescriptionView = Backbone.View.extend({
        options : { offset : 1 },

        initialize : function(){
            this.model.on("change:description", this.render, this);
            this.render();
        },

        render : function(){
            var $input = this.input();
            var description = this.model.get("description");
            $input.attr("value", description);
            $input.attr("size", description.length + this.options.offset);
            $input.removeClass();
            $input.addClass(this.model.isValid() ? "valid" : "invalid");
        },

        input : function(){
            var self = this;
            if (! self._input) {
                var $input = $("<input id='description' type='text'/>");
                $input.keyup(function(){
                    self.model.set("description", $input.val());
                });
                $input.keypress(function(e){
                    if (e.which === 13) { self.model.cast(); }
                });
                $input.appendTo(self.$el);
                self._input = $input;
            }
            return self._input;
        }
    });

    var ResultView = Backbone.View.extend({
        options : { last : "_" },

        initialize : function(){
            this.model.on("change:description", this.clear, this);
            this.model.on("change:description", this.render, this);
            this.model.on("cast", this.cast, this);
            this.render();
        },

        clear : function(){
            this.options.last = "_";
        },

        render : function(){
            var $span = this.span();
            if (this.model.isValid()) {
                $span.show();
                $span.text(this.options.last);
            } else {
                $span.hide();
            }
        },

        span : function(){
            if (! this._span) {
                var $span = $("<span class='result'>_</span>");
                $span.click(function(){
                    console.log("clicked");
                });
                $span.appendTo(this.$el);
                this._span = $span;
            }
            return this._span;
        },

        cast : function(value) {
            this.options.last = value;
            this.render();
        }
    });

    var SummaryView = Backbone.View.extend({
        template : _.template("<option value='<%= sides %>'><%= sides %></option>"),

        initialize : function(){
            this.render();
        },

        render : function(){
            var selection = this.selection();
            selection.val('6');
        },

        selection : function(){
            if (! this._selection) {
                var selection = $("<select class='sides'></selection");
                selection.appendTo(this.$el);
                this._selection = selection;
            }
            this.populate(this._selection);
            return this._selection;
        },

        populate : function(selection){
            var template = this.template;
            selection.empty();
            var connection = GURPS.database.connection();
            connection.transaction(function(tx){
                tx.executeSql("select distinct(sides) from results", [], function(rtx, result){
                    var rows = result.rows;
                    for (var index = 0; index < rows.length; index++) {
                        var row = rows.item(index);
                        selection.append(template(row));
                    }

                });
            });
        }
    });

    GURPS.MainView = MainView;
})($, _, Backbone, GURPS);

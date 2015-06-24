newsApp.service("NewsService", function() {
    
    this.convertIdToCategoryName = function(catId) {
        switch(catId){
            case 1:
                return "Technology"
            break;
            case 2:
                return "Science"
            break;
            case 3:
                return "Education"
            break;
            case 4:
                return "Entertainment"
            break;
            default:
                return ""

        }
    }
});
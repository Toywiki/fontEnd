function getUserName() {
    return location.search.split("user_name=")[1]
}
function getSubjectName(){
    return location.search.split("subject_name=")[1]
}
function getWikiName(){
    return location.search.split("wiki_name=")[1]
}
function getWikiID(){
    return location.search.split("wiki_id=")[1]
}
function getStatus(){
    return location.search.split("status=")[1]
}
function getSearchTitle(){
    return location.search.split("search_title=")[1]
}
function getSearchType(){
    return location.search.split("search_type=")[1]
}
base_site = "http://119.29.161.184:8000/";
cur_media = "http://119.29.161.184:8000";

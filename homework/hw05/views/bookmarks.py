import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids

class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # TODO: Add GET Logic...
    
        bookmarks = Bookmark.query.filter(Bookmark.user_id == self.current_user.id)
        data = [item.to_dict() for item in bookmarks.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)
    

    def post(self):
        # TODO: Add POST 
        

        data = request.json

        book_id = data.get("post_id")
        
        if not book_id:
            return Response(
            json.dumps({"message": "need a post ID!."}),
            mimetype="application/json",
            status=400,
            )
        try:
            post_exists = Post.query.get(book_id)         
        except:
            return Response(
                json.dumps({"message": "post id must be an integer!"}),
                    mimetype="application/json",
                    status=400,
            )   
        if not post_exists:
            print("is it this")
            return Response(
            json.dumps({"message": "Post not found!"}),
            mimetype="application/json",
            status=404,
        )
        ids = get_authorized_user_ids(self.current_user)


        if post_exists.user.id not in ids:
            return Response(
            json.dumps({"message": "Post not found!"}),
            mimetype="application/json",
            status=404
        )
        exists_already = Bookmark.query.filter_by(user_id=self.current_user.id, post_id=book_id).first()
        if exists_already:
            return Response(
            json.dumps({"message": "Can't bookmark the same post twice!"}),
            mimetype="application/json",
            status=400,
        )



        bookmark =  Bookmark(
            user_id=self.current_user.id,
            post_id=book_id,
        )
        
  
        db.session.add(bookmark)
        db.session.commit()
        return Response(
            json.dumps(bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        
        bookmark = Bookmark.query.get(id)
        
    
        if not bookmark:
            return Response(
            json.dumps({"message": f"bookmark {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        if not (bookmark.user_id == self.current_user.id):
            return Response(
            json.dumps({"message": "you are not the owner of this bookmark, so no deleting"}),
            mimetype="application/json",
            status=404,
            )
        
        db.session.delete(bookmark)
        db.session.commit()
        print(id)
        return Response(
            json.dumps({"message": f"bookmark {id} has been deleted."}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )

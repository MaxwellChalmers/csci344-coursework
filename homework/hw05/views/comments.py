import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.comment import Comment
from models.post import Post
from views import get_authorized_user_ids
class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # TODO: Add POST logic...
        data = request.json

        post_id = data.get("post_id")
        text = data.get("text")

        if not post_id:
            return Response(
            json.dumps({"message": "missing a post ID!."}),
            mimetype="application/json",
            status=400,
            )
        if not text:
            return Response(
            json.dumps({"message": "missing comment text!."}),
            mimetype="application/json",
            status=400,
            )
        try:
            post_exists = Post.query.get(post_id)         
        except:
            return Response(
                json.dumps({"message": "post id must be an integer!"}),
                    mimetype="application/json",
                    status=400,
            )   
        if not post_exists:
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
    
        comment = Comment(user_id=self.current_user.id, text=text, post_id=post_id)
        
        db.session.add(comment)
        db.session.commit()
        return Response(
            json.dumps(comment.to_dict()),
            mimetype="application/json",
            status=201,
        )


class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add DELETE logic...
        
        comment = Comment.query.get(id)
        if not comment:
            return Response(
            json.dumps({"message": f"comment {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        if not (comment.user.id == self.current_user.id):
            return Response(
            json.dumps({"message": "you are not the owner of this comment, so no deleting"}),
            mimetype="application/json",
            status=404,
            )
        
        
        db.session.delete(comment)
        db.session.commit()

        return Response(
            json.dumps({"message": f"comment {id} deleted"}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        CommentListEndpoint,
        "/api/comments",
        "/api/comments/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        CommentDetailEndpoint,
        "/api/comments/<int:id>",
        "/api/comments/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )

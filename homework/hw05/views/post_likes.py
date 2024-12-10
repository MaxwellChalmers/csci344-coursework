import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import get_authorized_user_ids

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        
        data = request.json

        post_id = data.get("post_id")
        if not post_id:
            return Response(
            json.dumps({"message": "need a post ID!."}),
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
        exists_already = LikePost.query.filter_by(user_id=self.current_user.id, post_id=post_id).first()
        if exists_already:
            return Response(
            json.dumps({"message": "Can't like the same post twice!"}),
            mimetype="application/json",
            status=400,
        )

        
        like = LikePost(
            post_id=post_id,
            user_id=self.current_user.id
        )

        db.session.add(like)
        db.session.commit()

        return Response(
            json.dumps(like.to_dict()),
            mimetype="application/json",
            status=201,
        )


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        
        like = LikePost.query.get(id)
        if not like:
            return Response(
            json.dumps({"message": f"post {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        if not (like.user_id == self.current_user.id):
            return Response(
            json.dumps({"message": "you are not the owner of this like, so no deleting"}),
            mimetype="application/json",
            status=404,
            )
        
        
        db.session.delete(like)
        db.session.commit()

        return Response(json.dumps({"message": f"like {id} has been deleted."}), mimetype="application/json", status=200)

  
        


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )

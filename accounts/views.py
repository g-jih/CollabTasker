import bcrypt as bcrypt
import jwt
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class SignUp(View):
    def post(self, request):
        try:
            if User.objects.filter(email=request.data['email']).exists():
                return JsonResponse({"message": "이미 가입된 이메일입니다."}, status=400)

            elif request.data['password'] == request.data['re_password']:
                return JsonResponse({"message": "비밀번호가 다릅니다."}, status=400)

            User.objects.create(
                username=request.data['username'],
                name=request.data['name'],
                email=request.data['email'],
                password=bcrypt(request.data['password'])
            ).save()

            return HttpResponse(status=200)

        except KeyError:
            return HttpResponse(status=200)


@csrf_exempt
class LogIn(View):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return HttpResponse(status=200)
        else:
            return JsonResponse({'message': '로그인 실패'}, status=404)
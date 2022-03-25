from django.contrib import auth
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class SignUp(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']
            password2 = request.data['password2']

            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "이미 가입된 아이디입니다.."}, status=400)
            elif User.objects.filter(email=email).exists():
                return JsonResponse({"message": "이미 가입된 이메일입니다."}, status=400)
            elif password != password2:
                return JsonResponse({"message": "비밀번호가 다릅니다."}, status=400)
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

            token = Token.objects.create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)

        except KeyError:
            return HttpResponse(status=402)


@method_decorator(csrf_exempt, name='post')
class LogIn(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        if username is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = auth.authenticate(request, username=username, password=password)

        if user is not None:
            auth.login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=200)
        else:
            return Response({'error': '로그인 실패'}, status=404)


class LogOut(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.token

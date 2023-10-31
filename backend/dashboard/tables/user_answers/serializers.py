from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from dashboard.models import UserAnswer, MultipleChoiceUserAnswer, Answer
from dashboard.tables.users.serializers import UserSerializer
from dashboard.tables.quizes.serializers import QuestionSerializer


class UserAnswerSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = UserAnswer
        fields = ('id', 'user', 'score', 'question',
                  'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')

    def get_user(self, obj: UserAnswer):
        if obj.result and obj.result.user:
            return UserSerializer(obj.result.user).data
        return None

    def update(self, instance: UserAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class MultipleChoiceQuestionAnswerSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField(read_only=True)
    correct = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Answer
        fields = ('id', 'question', 'content',
                  'correct',)

    def get_question(self, obj):
        return obj.question.id

def update_result(instance):
    result = instance.result
    user = result.user
    user_answers = result.user_answers.all()
    total_score = sum(user_answer.score for user_answer in user_answers)
    print(user_answers, [
          user_answer.score for user_answer in user_answers], total_score)
    # Update the total score in the Result model
    result.score = total_score / result.quiz.questions_count * 100
    result.save()

class MultipleChoiceUserAnswerSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    question = QuestionSerializer(read_only=True)
    selected_answer = MultipleChoiceQuestionAnswerSerializer(read_only=True)

    class Meta:
        model = MultipleChoiceUserAnswer
        fields = ('id', 'user', 'score', 'question', 'selected_answer',
                  'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')

    def get_user(self, obj: UserAnswer):
        if obj.result and obj.result.user:
            return UserSerializer(obj.result.user).data
        return None

    def update(self, instance: UserAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        update_result(instance)
        return instance


class UserAnswerPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        UserAnswer: UserAnswerSerializer,
        MultipleChoiceUserAnswer: MultipleChoiceUserAnswerSerializer,
    }

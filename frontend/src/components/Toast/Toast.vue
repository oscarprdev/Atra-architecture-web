<script lang="ts" setup>
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';

const props = defineProps<{
  content: string;
  type: 'success' | 'error';
}>();

onMounted(() => {
  switch (props.type) {
    case 'success':
      toast.success(props.content, {
        style: {
          fontSize: '0,7rem',
          fontFamily: 'system-ui',
        },
      });
      break;
    case 'error':
      toast.error(props.content, {
        style: {
          fontSize: '1rem',
          fontFamily: 'system-ui',
        },
      });
      break;

    default:
      break;
  }
});
</script>
